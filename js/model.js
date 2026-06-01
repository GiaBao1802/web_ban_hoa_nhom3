export const products = [
  {
    id: 1,
    name: "Hồng Pastel",
    category: "Tình yêu",
    price: 420000,
    description: "Hoa hồng kem và hồng phấn, phù hợp cho kỷ niệm nhẹ nhàng.",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 2,
    name: "Nắng Mai",
    category: "Sinh nhật",
    price: 360000,
    description: "Hướng dương và hoa đồng nội mang cảm giác tươi sáng.",
    image: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 3,
    name: "Lavender Mood",
    category: "Cảm ơn",
    price: 390000,
    description: "Sắc tím dịu, thơm nhẹ, hợp để gửi lời cảm ơn tinh tế.",
    image: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 4,
    name: "Tulip Trắng",
    category: "Tối giản",
    price: 510000,
    description: "Bó tulip trắng thanh lịch cho không gian hiện đại.",
    image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 5,
    name: "Peony Sweet",
    category: "Tình yêu",
    price: 680000,
    description: "Màu hồng mềm, form hoa đầy đặn cho món quà đặc biệt.",
    image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 6,
    name: "Green Garden",
    category: "Khai trương",
    price: 590000,
    description: "Phối lá xanh cùng hoa trắng, gọn đẹp và sáng sủa.",
    image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 7,
    name: "Cẩm Tú Cầu Xanh",
    category: "Cảm ơn",
    price: 450000,
    description: "Cẩm tú cầu xanh mát, tạo cảm giác trang nhã và chân thành.",
    image: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 8,
    name: "Baby Breath Cloud",
    category: "Tối giản",
    price: 320000,
    description: "Hoa baby trắng nhẹ như mây, hợp phong cách tinh giản.",
    image: "https://images.unsplash.com/photo-1518709779341-56cf4535e94b?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 9,
    name: "Lily Hương Trắng",
    category: "Sang trọng",
    price: 620000,
    description: "Hoa lily trắng có hương thơm thanh, phù hợp dịp trang trọng.",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 10,
    name: "Đồng Nội Mộc",
    category: "Sinh nhật",
    price: 350000,
    description: "Bó hoa nhỏ phối nhiều sắc màu, tự nhiên và dễ thương.",
    image: "https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 11,
    name: "Orchid Premium",
    category: "Sang trọng",
    price: 780000,
    description: "Lan hồ điệp cao cấp, dáng sang và giữ form lâu.",
    image: "https://images.unsplash.com/photo-1566907225474-0ecf9e5c0e32?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 12,
    name: "Hộp Hoa Ruby",
    category: "Khai trương",
    price: 720000,
    description: "Hộp hoa đỏ nổi bật, chỉn chu cho lời chúc may mắn.",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=900&q=85"
  }
];

export const state = {
  activeCategory: "Tất cả",
  searchTerm: "",
  cart: []
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(value);

export const getCategories = () => [
  "Tất cả",
  ...new Set(products.map((product) => product.category))
];

export const getFilteredProducts = () => {
  const keyword = state.searchTerm.trim().toLowerCase();

  return products.filter((product) => {
    const matchCategory =
      state.activeCategory === "Tất cả" || product.category === state.activeCategory;
    const matchKeyword =
      product.name.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword);

    return matchCategory && matchKeyword;
  });
};

export const addToCart = (productId) => {
  const item = state.cart.find((cartItem) => cartItem.productId === productId);

  if (item) {
    item.quantity += 1;
    return;
  }

  state.cart.push({ productId, quantity: 1 });
};

export const updateCartQuantity = (productId, change) => {
  const item = state.cart.find((cartItem) => cartItem.productId === productId);

  if (!item) return;

  item.quantity += change;
  state.cart = state.cart.filter((cartItem) => cartItem.quantity > 0);
};

export const getCartDetails = () =>
  state.cart.map((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return {
      ...product,
      quantity: item.quantity,
      lineTotal: product.price * item.quantity
    };
  });

export const getCartTotal = () =>
  getCartDetails().reduce((total, item) => total + item.lineTotal, 0);

export const getCartCount = () =>
  state.cart.reduce((total, item) => total + item.quantity, 0);
