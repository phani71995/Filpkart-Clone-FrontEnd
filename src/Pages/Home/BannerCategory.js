import React, { useEffect, useState } from 'react'
import FeachDataByCategory from '../../helper/FeachDataByCategory';
import { useLocation, useParams } from 'react-router-dom';
import SingleCart from './SingleCart';
import productCategory from '../../helper/ProductCategory';
import { backendapi } from '../../helper/Data';



const BannerCategory = () => {
  const [data, setData] = useState([]);
  const { category } = useParams();

  //filterCategorylist is send backend 
  const [filterCategory, setfilterCategory] = useState([])
  //console.log(category);
  const location = useLocation();
  const urlsearch = new URLSearchParams(location.search);
  const urlCateogaryListinArray = urlsearch.getAll("category")
  const urlCateogaryListObject = {}
  urlCateogaryListinArray.forEach((item) => {
    urlCateogaryListObject[item] = true
  })


  const [seletedCategory, setSeletedCategory] = useState(urlCateogaryListObject);

  const fetchData = async (category) => {
    try {
      const fetchData = await FeachDataByCategory(category);
      setData(fetchData.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(category);
  }, [category]);

  const FillterHandler = (e) => {

    const { name, value, checked } = e.target;

    setSeletedCategory((prv) => {
      return {
        ...prv,
        [value]: checked
      }

    })

  }


  console.log(seletedCategory);
  useEffect(() => {
    const changedArray = Object.keys(seletedCategory).map((oj) => {
      if (seletedCategory[oj] == true) {
        return oj
      }
      else {
        return null
      }
    }).filter((ele) => ele);
    setfilterCategory(changedArray)
  }, [seletedCategory])


  const FillteringByCategory = async () => {
    try {
      const response = await fetch(`${backendapi}/admin/product-fillter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ category: filterCategory })


      });
      const apidata = await response.json()
      console.log(apidata);
      setData(apidata.data)
    }
    catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    FillteringByCategory()
  }, [filterCategory])

  const sortHandler = (e) => {
    const sortOrder = e.target.value;
    const sortedData = [...data].sort((a, b) => {
      const priceA = Number(a.selling);
      const priceB = Number(b.selling);
      if (sortOrder === "asc") {
        return priceA - priceB;
      } else if (sortOrder === "dsc") {
        return priceB - priceA;
      }
      return 0;
    });
    setData(sortedData);
  };
  return (
    <><div className='flex'>
      <div className='w-25 border ml-4 mt-4 bg-gray-100'>
        {/* sort */}
        <div className='pl-4 dflex flex-column '>
          SortByPrice
          <div > <input
            type='radio'
            name="sort"
            id="loh"
            value={"asc"}
            onChange={sortHandler}
          /><label className='pl-2' htmlFor='loh'>Price:Low To Hight</label>   </div>
          <div ><input
            type='radio'
            name="sort"
            id="hlo"
            value={"dsc"}
            onChange={sortHandler}
          /><label className='pl-2' htmlFor='hlo'>Price: Hight To Low</label></div>


          {/* filter*/}
          <div >
            Category
            {productCategory?.map((category) => (
              <div ket={category.id}><input type='checkbox' checked={seletedCategory[category.value]} name={category.label} id={category.label} value={category.value} onClick={FillterHandler} /><label className='pl-2' htmlFor={category.label}>{category.label} </label>   </div>

            ))

            }

          </div>



        </div>
      </div>

      <div>
        <div className='ml-5 text-danger'>No of products:{data.length}</div>
        <SingleCart product={data} />
      </div>
    </div >

    </>
  )
}

export default BannerCategory
