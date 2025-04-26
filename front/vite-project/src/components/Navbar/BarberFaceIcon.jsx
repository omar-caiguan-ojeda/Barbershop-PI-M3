// Icono de la barbería usando favicon.png
export default function BarberFaceIcon({ size = 36, style }) {
  return (
    <img
      src="/favicon.png"
      alt="Barbería Icono"
      width={size}
      height={size}
      style={{ display: 'inline-block', borderRadius: '50%', ...style }}
    />
  );
}
