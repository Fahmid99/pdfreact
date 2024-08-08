
import logo from "../assets/kyo.png";
function Navbar() {
  return (
    <div style={{border:"1px solid #EEEEEE" , height:"80px"}}>
      {" "}
      <img
        src={logo}
        alt="Logo"
        style={{ width: "130px", margin: "5px", padding: "10px" }}
      
      />
    </div>
  );
}

export default Navbar;
