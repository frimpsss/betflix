import { useState } from "react";
interface prop {
  id: string;
  loaderclass?: React.HTMLAttributes<HTMLDivElement>["className"];
}

const CustomImage = (
  props: prop & React.ImgHTMLAttributes<HTMLImageElement>
) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div>
      <img
        {...props}
        src={`https://image.tmdb.org/t/p/original${props.id}`}
        alt=""
        onLoad={() => setLoaded(true)}
        style={{ display: loaded ? "block" : "none" }}
      />
      {!loaded && (
        <div
          className={`${props.loaderclass} ${props.className} bg-gray-200 animate-pulse`}
        ></div>
      )}
    </div>
  );
};

export default CustomImage;
