// src/views/user/ProductDetail/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { productService } from "../../../src/services/productService";
import { requestService } from "../../../src/services/requestService";
import { useNotifications } from "../../../src/context/NotificationContext";
import GiftsByUser from "./GiftsByUser";
import SimilarProducts from "./SimilarProducts";
import SuccessPopup from "./SuccessPopup";
import FailurePopup from "./FailurePopup";
import MessagePopup from "./MessagePopup";

import HeartFilled from "../../../src/assets/img/HeartFilled.png";
import Heart from "../../../src/assets/img/heart.png";
import Chat from "../../../src/assets/img/chat2.png";
import Shop from "../../../src/assets/img/shop.png";
import Star from "../../../src/assets/img/star.png";
import Eye from "../../../src/assets/img/eye_2.png";
import Search from "../../../src/assets/img/iconsearch.png";
import DefaultAvatar from "../../../src/assets/img/avatar_1.png";
import socket from "../../../src/services/socket";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);
  
  // Use the notification context
  const { refresh: refreshNotifications } = useNotifications();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id);
        if (!data) return;

        setProduct(data);
        const mainImg = data.image_url?.url || data.img || "/default-product.png";
        setSelectedImage(mainImg);

        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (currentUser) {
          const productOwnerId =
            typeof data.user_id === "object" ? data.user_id._id : data.user_id;
          setIsOwner(
            currentUser.id === productOwnerId || currentUser._id === productOwnerId
          );
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const checkRequestStatus = async () => {
      try {
        const response = await requestService.checkRequestStatus(id);
        setRequestStatus(response.status || "none");
      } catch (error) {
        console.error("Error checking request status:", error);
        setRequestStatus("none");
      } finally {
        setLoadingStatus(false);
      }
    };

    if (id) {
      fetchProduct();
      checkRequestStatus();
    }
  }, [id]);

  const handleToggleFavorite = () => {
    setIsFavorited((prev) => !prev);
    // TODO: call API để lưu trạng thái yêu thích
  };

  // Khi bấm "Nhận ngay" => mở popup nhập tin nhắn
  const handleReceiveClick = () => {
    if (requestStatus === "pending") {
      setFailureMessage("Bạn đã gửi yêu cầu trước đó và đang chờ duyệt.");
      setShowFailure(true);
      return;
    }
    if (requestStatus === "approved") {
      setFailureMessage("Bạn đã được duyệt nhận sản phẩm này.");
      setShowFailure(true);
      return;
    }
    setShowMessagePopup(true);
  };

  // Xử lý gửi request kèm tin nhắn
  const handleSendMessage = async (message) => {
    try {
      const res = await requestService.createRequest({ productId: id, message });
      if (res) {
        setShowSuccess(true);
        setRequestStatus("pending");
        setShowMessagePopup(false);

        // Refresh notifications to show the new one
        refreshNotifications();

        // emit socket notification cho chủ sản phẩm
        const ownerId =
          typeof product.user_id === "object" ? product.user_id._id : product.user_id;
        const currentUser = JSON.parse(localStorage.getItem("user"));

        socket.emit("sendRequest", {
          productId: id,
          productTitle: product.title,
          requesterId: currentUser?._id || currentUser?.id,
          requesterName: currentUser?.name || "Người dùng",
          ownerId,
          message: message || "Tôi muốn nhận sản phẩm này"
        });
      } else {
        setFailureMessage("Có lỗi xảy ra khi gửi yêu cầu.");
        setShowFailure(true);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Có lỗi xảy ra";
      setFailureMessage(errorMessage);
      setShowFailure(true);
    }
  };

  const renderReceiveButton = () => {
    if (isOwner || loadingStatus) return null;

    switch (requestStatus) {
      case "none":
        return (
          <button
            onClick={handleReceiveClick}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-full bg-green-600 text-white hover:bg-green-700"
          >
            <img src={Shop} alt="Đặt hàng" className="w-5 h-5" />
            Nhận ngay
          </button>
        );
      case "pending":
        return (
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-full bg-yellow-500 text-white cursor-not-allowed"
            disabled
          >
            <img src={Shop} alt="Đặt hàng" className="w-5 h-5" />
            Đang chờ duyệt
          </button>
        );
      case "approved":
        return (
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-full bg-blue-600 text-white cursor-not-allowed"
            disabled
          >
            <img src={Shop} alt="Đặt hàng" className="w-5 h-5" />
            Đã được duyệt
          </button>
        );
      case "rejected":
        return (
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-full bg-red-500 text-white cursor-not-allowed"
            disabled
          >
            <img src={Shop} alt="Đặt hàng" className="w-5 h-5" />
            Đã bị từ chối
          </button>
        );
      default:
        return null;
    }
  };

  const user = product?.user_id;
  const username = user?.username || user?.name || "";
  const profileLink = username ? `/profile/${username}` : "#";

  const imageList = product?.sub_images_urls?.length
    ? [product.image_url?.url, ...product.sub_images_urls.map((img) => img.url)]
    : [product?.image_url?.url || product?.img];

  const requestTime =
    new Date().toLocaleTimeString("vi-VN") +
    " ngày " +
    new Date().toLocaleDateString("vi-VN");

  if (!product)
    return <div className="p-6 text-center">Đang tải chi tiết sản phẩm...</div>;
  return (
    <div className="bg-[#E8F5E9] min-h-screen py-6 px-2 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#F4FCEF] p-6 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600 mb-2 italic">
            Món quà nhỏ &gt;&gt; {product.category?.category_name || "Danh mục"} &gt;&gt; {product.title}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Hình ảnh */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 w-24">
                {imageList.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`thumb-${i}`}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 object-cover border rounded-lg cursor-pointer transition ${
                      selectedImage === img ? "ring-2 ring-green-500" : "hover:ring-1 hover:ring-gray-300"
                    }`}
                  />
                ))}
              </div>

              <div className="flex-1 bg-white rounded-lg shadow overflow-hidden flex items-center justify-center h-[420px]">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

            {/* Thông tin sản phẩm */}
            <div>
              <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
              <div
                onClick={handleToggleFavorite}
                className="flex items-center gap-2 cursor-pointer my-2"
              >
                <img
                  src={isFavorited ? HeartFilled : Heart}
                  alt="heart"
                  className="w-5 h-5"
                />
                <span
                  className={`text-sm ${
                    isFavorited ? "text-green-600 font-medium" : "text-gray-700"
                  }`}
                >
                  {isFavorited ? "Đã thêm vào yêu thích" : "Thêm vào yêu thích"}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs font-medium bg-[#D1FAE5] text-[#047857] px-2 py-1 rounded-full">
                  {product.category?.category_name}
                </span>
                <span className="inline-flex items-center text-xs font-medium bg-[#F2F2F2] text-[#047857] px-2 py-1 rounded-full">
                  <img src={Search} alt="Tìm kiếm" className="w-4 h-4 mr-1" />
                  {product.location || "Chưa rõ"}
                </span>
                {product.label && (
                  <span className="text-xs font-medium bg-[#FEF08A] text-[#047857] px-2 py-1 rounded-full">
                    {product.label}
                  </span>
                )}
              </div>

              {product.description && (
                <div className="mb-2 border-b border-gray-200 pb-1">
                  <p className="text-sm text-[#868686]">
                    <strong className="text-black">Giới thiệu: </strong>{" "}
                    {product.description}
                  </p>
                </div>
              )}

              <div className="border-b border-gray-200 pb-1 mb-4 text-sm flex justify-between items-center">
                <p className="text-sm text-[#868686]">
                  Size:{" "}
                  <strong className="text-black">{product.size || "Không rõ"}</strong>
                </p>
                <span className="flex items-center">
                  <img src={Eye} alt="eye" className="w-5 h-5 mr-1" />
                  <a href="#" className="text-black underline text-sm">
                    Xem cách chọn size
                  </a>
                </span>
              </div>

               <div className="flex gap-3 mb-4">
            <Link
              to={`/messages?user=${encodeURIComponent(username)}&product=${product._id}`}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-full border border-green-500 text-green-700 hover:bg-green-50"
            >
              <img src={Chat} alt="Chat" className="w-5 h-5" />
              Chat ngay
            </Link>

            {renderReceiveButton()}
          </div>

              {/* Chủ sản phẩm */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={user?.avatar?.url || DefaultAvatar}
                  alt="Người đăng"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <Link
                    to={profileLink}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {user?.name || "Không rõ"}
                  </Link>
                  <p className="text-xs text-gray-500">
                    Dudi Software <br /> Hoạt động 5 phút trước
                  </p>
                </div>
                <div className="ml-auto text-sm flex flex-col items-end leading-tight">
                  <div className="flex items-center gap-1">
                    <span>4.6</span>
                    <img src={Star} alt="star" className="w-5 h-5" />
                  </div>
                  <span>16 đánh giá</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mô tả sản phẩm */}
          <div className="bg-[#F4FCEF] p-4 mb-4">
            <h3 className="text-lg font-bold mb-2">Mô tả sản phẩm</h3>
            <div className="text-sm text-gray-700 space-y-2">
              {Array.isArray(product.description)
                ? product.description.map((p, i) => <p key={i}>{p}</p>)
                : <p>{product.description}</p>}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-[#F4FCEF] p-4">
            <h3 className="text-lg font-bold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {(product.tags || []).map((tag, i) => (
                <span
                  key={i}
                  className="text-sm bg-[#919EAB29] hover:bg-[#c3c3c3] px-3 py-1 rounded-full cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sản phẩm khác của người đăng */}
        <div className="mt-8">
          <GiftsByUser user={user} currentProductId={product._id} />
        </div>

        {/* Sản phẩm tương tự */}
        <div className="mt-8">
          <SimilarProducts />
        </div>

        {/* Popups */}
        {showMessagePopup && (
          <MessagePopup
            onClose={() => setShowMessagePopup(false)}
            onSend={handleSendMessage}
          />
        )}
        {showSuccess && <SuccessPopup onClose={() => setShowSuccess(false)} />}
        {showFailure && (
          <FailurePopup
            onClose={() => setShowFailure(false)}
            requestTime={requestTime}
            message={failureMessage}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;