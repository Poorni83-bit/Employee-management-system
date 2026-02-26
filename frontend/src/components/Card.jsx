export default function Card({ title, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <h4>{title}</h4>
      <p>View {title} details</p>
    </div>
  );
}
