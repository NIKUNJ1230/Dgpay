import React,{useEffect} from 'react'
import Allapi from '../../allapis/api';

const Header = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // console.log("i m sidebar")
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${Allapi.port}${Allapi.userread}`, {
          headers: {
            user_token: `${token}`, // Add headers if needed
          },
        });
        setUsers(response.data.user);
        console.log("Users:", response.data.user.first_name);
        console.log("Users:", response.data.user.profile_image);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); // Call the function to fetch users
  }, []);
  return (
    <>
       <div className="header">
        <div className="container" style={{ color:'white' , marginTop:'0px' }}>
          <div className="row" style={{  marginTop:'10px'}}>
            <div className="col-md-6 ">
              <span className="title-text-right">
                Shop Name:
                <input
                  className="input-filed"
                  value={users?.shop_name ? users.shop_name : ""}
                  readOnly
                  type="text"
                  name=""
                  id=""
                  style={{  margin:'5px',border: "1px solid white", boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)" }}
                />
              </span>
            </div>
            <div className="col-md-6  text-md-end">
              <span className="title-text-right">
                Total balance:
                <input
                  type="text"
                  value={
                    users?.total_balance ? users.total_balance.toFixed(2) : ""
                  }
                  readOnly
                  className="input-filed"
                  name=""
                  id=""
                  style={{  margin:'10px',border: "1px solid white", boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)" }}
                />
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <span className="title-text-right">
                Name:
                <input
                  className="input-filed"
                  value={users.first_name ? users.first_name : ""}
                  readOnly
                  type="text"
                  name=""
                  id=""
                  style={{  margin:'5px',border: "1px solid white", boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)" }}
                />
              </span>
            </div>
            <div className="col-md-6 text-md-end">
              <span className="title-text-right">
                Total Transaction:
                <input
                  type="text"
                  value={users.total_transaction}
                  readOnly
                  className="input-filed"
                  name=""
                  id=""
                  style={{  margin:'5px',border: "1px solid white", boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)" }}
                />
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 "></div>
            <div className="col-md-6 text-md-end">
              <span className="title-text-right">
                Total Transaction balance:
                <input
                  type="text"
                  value={
                    users?.total_transaction_amount
                      ? users.total_transaction_amount.toFixed(2)
                      : ""
                  }
                  readOnly
                  className="input-filed"
                  name=""
                  id=""
                  style={{  margin:'5px',border: "1px solid white", boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)" }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>  
    </>
  )
}

export default Header
