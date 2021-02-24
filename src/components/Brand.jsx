import { Link } from 'react-router-dom';

export function Brand(props) {
  return (
    <div className="Brand">
      <Link to="/admin/dashboard">
        GeoERP
      </Link>
    </div>
  );
};