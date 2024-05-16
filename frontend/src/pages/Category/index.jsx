import React from 'react'
import Home from "../Home"


function index() {

    /* useEffect(() => {
        axios.get("http://localhost:5173//category", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((result) => {
            setCategoryList(result.data.category.map((category, index) => {
                return (
                    <div className="col-md-4 mb-4" key={index}>
                        <Link to={`/product/${category.title}`} className="text-decoration-none">
                            <div className="card">
                                <img src={category.img} className="card-img-top" alt={category.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{category.title}</h5>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            }));
        }).catch((err) => {
            console.log(err.message);
        });
    }, []); */



  return (
    <div>
        <Home/>
    </div>
  )
}

export default index