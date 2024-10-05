// width 170, height 200
export default function ImageResize(file, width, height) {
  // file이 attached 받으면 되는거 ? 아니 result를 받아야하는거 아님 ??
  if (file) {
    const context = canvas.getContext("2d");
    const fileReader = new FileReader();
    const img = new Image();
    fileReader.onload = (e) => {
      img.onload = () => {
        // Canvas에 이미지를 그린 후 리사이징
        context.drawImage(img, 0, 0, WIDTH, HEIGHT);

        // Blob 형태로 리사이징된 이미지 파일을 저장
        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], file.name, { type: file.type });
          setResizedFile(resizedFile);

          // 용량 확인
          console.log("Resized size = " + blob.size);
        }, file.type);
      };

      img.src = e.target.result;
    };

    fileReader.readAsDataURL(file);
  }

  return "?";
}

// $("#thumbnailFile").on("change", function () {
//     // thumbnailFile 에 첨부된 이미지 파일
//     const file = this.files[0];

//     if (file) {
//         const context = canvas[0].getContext("2d");
//         const fileReader = new FileReader();
//         const img = new Image();

//         fileReader.onload = function (e) {
//             // console.log(e);
//             // console.log("e " + e.target.result);

//             img.onload = function () {
//                 context.drawImage(img, 0, 0, WIDTH, HEIGHT);

//                 canvas[0].toBlob(function (blob) {
//                     resizedFile = new File([blob], file.name, {type: file.type});
//                     //용량 확인
//                     console.log("Resized size = " + blob.size);
//                 }, file.type);
//             };

//             img.src = e.target.result;
//         };

//         fileReader.readAsDataURL(file);
//     }
// });
