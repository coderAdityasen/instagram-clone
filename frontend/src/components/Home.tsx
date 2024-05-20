import { CiBookmark, CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";

function Home() {
  return (
    <>
      <div className="border">
        <img
          src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
          className="w-28 mx-auto"
          alt=""
        />
      </div>

      <div className="w-full  overflow-y-scroll ">
        <div className="flex border justify-normal py-1  items-center ">
          {/* post user info */}
          <img
            className="w-[40px]"
            src="https://i.pinimg.com/564x/54/26/a5/5426a51fe15b4bb1dca378b3f6963d30.jpg"
            alt=""
          />
          <div className="ml-3 leading-4">
            <h1>Adityaasen</h1>
            <p>indore</p>
          </div>
        </div>
        {/* post image */}
        <img
          className="w-full h-[25rem] object-cover mx-auto"
          src="https://www.dianamiaus.com/wp-content/uploads/2019/06/Diana-1084.jpg"
          alt=""
        />
        {/* like commenct save */}
        <div className="flex justify-between mx-1 items-center">
          <div className="flex gap-2 items-center ">
            <CiHeart className="text-4xl" />
            <GoComment className="text-3xl" />
          </div>
          <CiBookmark className="text-3xl" />
        </div>
        <h1 className="mx-1">
          username We are passionate about promoting and celebrating Tokyo the
          world over - Account managed
        </h1>
      </div>

      {/* next post */}
      <div className="w-full my-4 overflow-y-scroll ">
        <div className="flex justify-normal mb-1 mt-1 items-center ">
          {/* post user info */}
          <img
            className="w-[40px]"
            src="https://i.pinimg.com/564x/54/26/a5/5426a51fe15b4bb1dca378b3f6963d30.jpg"
            alt=""
          />
          <div className="ml-3 leading-4">
            <h1>Adityaasen</h1>
            <p>indore</p>
          </div>
        </div>
        {/* post image */}
        <img
          className="w-full h-[25rem] object-cover mx-auto"
          src="https://www.dianamiaus.com/wp-content/uploads/2019/06/Diana-1084.jpg"
          alt=""
        />
        {/* like commenct save */}
        <div className="flex justify-between mx-1 items-center">
          <div className="flex gap-2 items-center ">
            <CiHeart className="text-4xl" />
            <GoComment className="text-3xl" />
          </div>
          <CiBookmark className="text-3xl" />
        </div>
        <h1 className="mx-1">
          username We are passionate about promoting and celebrating Tokyo the
          world over - Account managed
        </h1>
      </div>
    </>
  );
}

export default Home;
