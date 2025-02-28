export const AnimeCard = ({ title, imageUrl, onClick }: { title: string; imageUrl: string; onClick: () => void }) => {
    return (
      <div onClick={onClick} style={{ cursor: "pointer", marginBottom: "10px" }}>
        <p>{title}</p>
        <img
          src={imageUrl}
          alt={title}
          style={{ width: "100px", height: "150px", objectFit: "cover", borderRadius: "10px" }}
        />
      </div>
    );
};