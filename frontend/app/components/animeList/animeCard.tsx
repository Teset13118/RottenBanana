export const AnimeCard = ({ title, imageUrl, onClick }: { title: string; imageUrl: string; onClick: () => void }) => {
    return (
      <div onClick={onClick} style={{ cursor: "pointer", marginBottom: "10px" }} className="lg:w-[250px] lg:mx-[20] mx-[37] w-[300px]">
        <img
          src={imageUrl}
          alt={title}
          style={{ width: "300px", height: "400px", objectFit: "cover", borderRadius: "10px" }}
        />
        <p className="text-xl text-bold text-[#FEC81A]">{title}</p>
      </div>
    );
};