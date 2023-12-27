export default function index({ title, className }) {
  return (
    <label
      className={`block text-gray-700 text-sm font-bold mb-1 ${className}`}
    >
      {title}
    </label>
  );
}
