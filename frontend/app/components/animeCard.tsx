export const AnimeCard = ({ title, imageUrl, onClick }: { title: string; imageUrl: string; onClick: () => void }) => {
    return (
      <div onClick={onClick} style={{ cursor: "pointer", marginBottom: "10px" }} className="w-[700px] m-5">
        <img
          src={imageUrl}
          alt={title}
          style={{ width: "700px", height: "150px", objectFit: "cover", borderRadius: "10px" }}
        />
        <p>{title}</p>
      </div>
    );
};