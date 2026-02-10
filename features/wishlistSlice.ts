import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as wishlistService from "@/services/wishlistService";

export interface WishlistItem {
  _id: string;
  title: string;
  price: number; 
  imageCover: string;
}

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};

const mapWishlistItems = (apiItems: any[]): WishlistItem[] => {
  return apiItems.map((item: any) => ({
    _id: item._id || item.id || `temp-${Math.random().toString(36).slice(2)}`, 
    title: item.title || item.product?.title || "Product without title",
    price: Number(item.price || item.product?.price) || 0,
    imageCover: item.imageCover || item.product?.imageCover || "https://placehold.co/160x160",
  }));
};

export const fetchWishlistItems = createAsyncThunk(
  "wishlist/fetchWishlistItems",
  async (_, { rejectWithValue }) => {
    try {
      const res = await wishlistService.getWishlistItems();
      return mapWishlistItems(res.data.data || []);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed fetch wishlist");
    }
  }
);

export const addWishlistItem = createAsyncThunk(
  "wishlist/addWishlistItem",
  async (productId: string, { rejectWithValue }) => {
    try {
      const res = await wishlistService.addWishlistItem(productId);
      return mapWishlistItems(res.data.data || []);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to add");
    }
  }
);

export const removeWishlistItem = createAsyncThunk(
  "wishlist/removeWishlistItem",
  async (productId: string, { rejectWithValue }) => {
    try {
      await wishlistService.removeWishlistItem(productId);
      return productId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to remove");
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlistItems.fulfilled, (state, action: PayloadAction<WishlistItem[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlistItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addWishlistItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWishlistItem.fulfilled, (state, action: PayloadAction<WishlistItem[]>) => {
        state.loading = false;
        state.items = action.payload; 
      })
      .addCase(addWishlistItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(removeWishlistItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeWishlistItem.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.items = state.items.filter((i) => i._id !== action.payload);
      })
      .addCase(removeWishlistItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default wishlistSlice.reducer;