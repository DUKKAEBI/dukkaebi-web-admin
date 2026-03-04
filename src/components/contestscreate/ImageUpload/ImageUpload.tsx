// 대회 이미지 업로드 컴포넌트
import * as S from "../../../page/contests/create/styles";

interface ImageUploadProps {
  image: File | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
}

export const ImageUpload = ({ image, onImageChange, onImageRemove }: ImageUploadProps) => {
  return (
    <S.Group>
      <S.Label>대회 이미지</S.Label>
      <S.FileInputWrapper>
        <S.FileInput
          type="file"
          id="image"
          onChange={onImageChange}
          accept="image/*"
        />
        <S.FileButton htmlFor="image">이미지 선택</S.FileButton>
      </S.FileInputWrapper>
      {image && (
        <S.FileItem>
          <S.FileIcon>🖼️</S.FileIcon>
          <S.FileName>{image.name}</S.FileName>
          <S.FileRemove type="button" onClick={onImageRemove}>✕</S.FileRemove>
        </S.FileItem>
      )}
    </S.Group>
  );
};
