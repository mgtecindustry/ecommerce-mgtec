const GoogleMapsLocation: React.FC = () => {
  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden">
      <h2 className="text-lg font-semibold mb-4">Locația pe hartă</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2715.104288605881!2d23.90780937492291!3d47.11662762168611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4749bf02e84aa159%3A0x2a3bf3454f8d4fd7!2sMG-Tec%20Industry!5e0!3m2!1sen!2sro!4v1735542760023!5m2!1sen!2sro"
        className="absolute top-0 left-0 w-full h-full"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default GoogleMapsLocation;
