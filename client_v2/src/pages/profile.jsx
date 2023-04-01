import React from "react";
import useAuth from "../hooks/userAuth.jsx";
import jwtDecode from "jwt-decode";
import { GET_CATEGORIES, DELETE_CATEGORY } from "../graphql/categories.js";
import { useQuery, useMutation } from "@apollo/client";
import { CategoryForm } from "../components/CategoryForm.jsx";
import Spinner from "../components/Spinner.jsx";
import Navbar from "../components/Navbar.jsx";
import { BsFillTrash3Fill } from "react-icons/bs";

function Profile() {
  const { user } = useAuth();


  function decodeUser(token) {
    let decoded;
    if (token) {
      decoded = jwtDecode(token);
      return decoded.id;
    }
    return decoded
  }

  const { loading, error, data } = useQuery(GET_CATEGORIES, {
    variables: { owner: decodeUser(user) },
  });

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [
      {
        query: GET_CATEGORIES,
        variables: { owner: decodeUser(user) },
      },
      "GetCategory",
    ],
  });

  if (loading) return (
    <div className="flex flex-wrap justify-center p-[13px] gap-14">
      <Spinner />
    </div>
  )
  if (error) return <>Error :(</>;

  return (
    <div className="flex flex-col gap-10 md:mx-[30px]">
      <Navbar />
      <div className="flex justify-between p-4 items-center">
        <div className=" flex flex-col">
          <h2 className="text-[34px] font-bold">
            My Categories
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12 mt-10" >
        <div className="col-span-4 px-7">
          <CategoryForm user_id={decodeUser(user)} />
        </div>
        <div className="col-span-4  lg:col-span-8 md:overflow-y-auto md:h-[600px] py-20 md:px-2">
          <div className="flex flex-wrap gap-4 md:justify-around justify-center">
            {data.categories.map((category) => (
              <div
                key={category._id}
                style={{ backgroundColor: category.color }}
                className="p-[10px] rounded-lg text-black my-4 w-[288px] h-[295px] flex flex-col items-center justify-between"
              >

                <h3 className="font-bold text-black text-[45px]">{category.name}</h3>

                <div className="flex justify-end w-full p-[10px]">
                  <button
                    className=""
                    onClick={() => {
                      deleteCategory({ variables: { id: category._id } });
                    }}
                  >
                    <BsFillTrash3Fill className="h-5 w-5 text-black " />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

