import { Link } from "react-router-dom";
import { House } from "lucide-react";
function NavbarItem({ icon, child, route}) {
  return (
    <Link 
    className="flex gap-2 bg-slate-50 rounded p-2 shadow-lg
     max-w-40 hover:bg-blue-100" to={route}
    > 
      <div>{icon}</div>
      <div className="text-2xl">{child}</div>
    </Link>
  )
} 

export default NavbarItem;