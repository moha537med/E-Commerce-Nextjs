import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as orderService from "@/services/orderService";

export interface OrderProduct {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  products: OrderProduct[];
  total: number;
  address: string;
  paymentMethod: string;
  createdAt: string;
}

interface OrdersState {
  items: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await orderService.getOrders();
      return (res.data.data || []).map((o: any) => ({
        id: o._id,
        products: (o.products || []).map((p: any) => ({
          id: p._id || p.product?._id,
          title: p.title || p.product?.title || "Unknown",
          price: Number(p.price || p.product?.price || 0),
          quantity: Number(p.count || p.quantity || 1),
        })),
        total: Number(o.total || 0),
        address: o.shippingAddress?.details || o.address || "",
        paymentMethod: o.paymentMethod || "cash",
        createdAt: o.createdAt || new Date().toISOString(),
      }));
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to load orders");
    }
  }
);

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (
    payload: { cartId: string; address: string; paymentMethod: string; total: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await orderService.createOrder(payload.cartId, {
        shippingAddress: {
          details: payload.address,
        },
        paymentMethod: payload.paymentMethod,
      });

      const o = res.data.data || res.data;

      return {
        id: o._id,
        products: (o.cart?.products || o.products || []).map((p: any) => ({
          id: p._id || p.product?._id,
          title: p.title || p.product?.title || "Unknown",
          price: Number(p.price || p.product?.price || 0),
          quantity: Number(p.count || p.quantity || 1),
        })),
        total: Number(o.total || payload.total || 0),
        address: o.shippingAddress?.details || o.address || payload.address,
        paymentMethod: o.paymentMethod || payload.paymentMethod,
        createdAt: o.createdAt || new Date().toISOString(),
      };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Failed to create order"
      );
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload); 
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default ordersSlice.reducer;