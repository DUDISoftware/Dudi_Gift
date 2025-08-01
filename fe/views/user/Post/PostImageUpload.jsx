import { Eye } from 'lucide-react';
import Upload from '../../../src/assets/img/upload.png';

const PostImageUpload = ({ handleFileChange }) => (
  <div>
    <label className="block text-sm font-medium mb-4 flex justify-between items-center">
      6. UPLOAD HÌNH ẢNH VÀ CHỈNH SỬA
      <span className="text-black text-sm flex items-center gap-1 underline cursor-pointer">
        <Eye size={14} />
        Xem trước bài đăng
      </span>
    </label>

    <label className="cursor-pointer block w-full">
      <input
        type="file"
        accept="image/*,image/gif"
        multiple
        hidden
        onChange={handleFileChange}
      />
      <div className="w-full">
        <img
          src={Upload}
          alt="Ảnh upload"
           className="w-full aspect-[3/1] object-cover rounded-lg"
        />
      </div>
    </label>

    <p className="text-sm mt-2 text-gray-500 text-center">
      Chọn tối đa 5 hình ảnh. Định dạng: JPG, PNG, GIF (Mỗi ảnh tối đa 5MB)
    </p>
  </div>
);

export default PostImageUpload;
