import React from "react";
import useAuth from "../hooks/userAuth.jsx";
import jwt_decode from "jwt-decode";
import { GET_CATEGORIES } from "../graphql/categories.js";
import { useQuery } from "@apollo/client";

function Profile() {
  const { user } = useAuth();

  function decodeUser(token) {
    const decoded = jwt_decode(token);
    return decoded.id;
  }

  const { loading, error, data } = useQuery(GET_CATEGORIES, {
    variables: { owner: decodeUser(user) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <>Error :(</>;

  return (
    <section>
      <div class="container px-6 m-auto">
        <div class="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12 mt-10">
          <div class="col-span-4">form</div>
          <div class="col-span-4  lg:col-span-8">
            <ul>
              {data.categories.map((category) => (
                <div
                  key={category._id}
                  style={{ backgroundColor: category.color }}
                >
                  {category.name}
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
