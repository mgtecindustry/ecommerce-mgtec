import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import GoogleMapsLocation from "./GoogleMapsLocation";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white p-8">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Contact Details */}
        <div className="space-y-4">
          <ContactItem
            icon={<Phone className="w-5 h-5" />}
            text="+40 123 456 789"
          />
          <ContactItem
            icon={<Mail className="w-5 h-5" />}
            text="contact@mgtecindustry.ro"
          />
          <ContactItem
            icon={<MapPin className="w-5 h-5" />}
            text="str. Leon Birnbaum 4, 405200, Dej, jud. Cluj, România"
          />
        </div>

        {/* Social Links + Programul de lucru */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Link
              target="_blank"
              href="https://www.facebook.com/MgTecIndustry/"
              className="hover:text-blue-500 transition"
            >
              <FaFacebook className="w-6 h-6" />
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/company/mgtec-industry/"
              className="hover:text-blue-700 transition"
            >
              <FaLinkedin className="w-6 h-6" />
            </Link>
          </div>
          <ContactItem
            icon={<Clock className="w-5 h-5" />}
            text="Luni - Vineri, 8:00 - 16:00"
          />
        </div>

        {/* Google Maps */}
        <div>
          <GoogleMapsLocation />
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} MG-Tec Industry. Toate drepturile
          rezervate.
        </p>
      </div>
    </footer>
  );
};

interface ContactItemProps {
  icon: React.ReactNode;
  text: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default Footer;
