import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as cartService from "@/services/cartService";

export interface CartItem {
  _id: string;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    price: number;
  };
  count: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  cartId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  cartId: null,
  loading: false,
  error: null,
};

const mapApiResponse = (apiProducts: any[]): CartItem[] =>
  apiProducts.map((item: any) => ({
    _id: item._id,
    product: item.product,
    count: item.count,
    price: item.price,
  }));

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const res = await cartService.getCartItems();
      const cartData = res.data.data;
      return {
        cartId: cartData._id,
        products: mapApiResponse(cartData.products || []),
      };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch cart");
    }
  }
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async (productId: string, { rejectWithValue }) => {
    try {
      const res = await cartService.addToCart(productId);
      return res.data.data.products || [];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to add");
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, count }: { productId: string; count: number }, { rejectWithValue }) => {
    try {
      const res = await cartService.updateCartItem(productId, count);
      return mapApiResponse(res.data.data.products || []);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to update");
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId: string, { rejectWithValue }) => {
    try {
      const res = await cartService.removeCartItem(productId);
      return mapApiResponse(res.data.data.products || []);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to remove");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.cartId = null;
    },
  },
  extraReducers: (builder) => {
    const pending = (state: CartState) => { state.loading = true; state.error = null; };
    const rejected = (state: CartState, action: any) => { state.loading = false; state.error = action.payload; };

    builder
      .addCase(fetchCartItems.fulfilled, (state, action: PayloadAction<{cartId: string, products: CartItem[]}>) => {
        state.loading = false;
        state.items = action.payload.products;
        state.cartId = action.payload.cartId;
      })
      .addCase(fetchCartItems.rejected, rejected)
      .addCase(addCartItem.pending, pending)
      .addCase(addCartItem.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addCartItem.rejected, rejected)
      .addCase(updateCartItemQuantity.pending, pending)
      .addCase(updateCartItemQuantity.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(updateCartItemQuantity.rejected, rejected)
      .addCase(removeCartItem.pending, pending)
      .addCase(removeCartItem.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(removeCartItem.rejected, rejected);
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
