import InitialModal from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { Download } from "lucide-react";
import { redirect } from "next/navigation";
const SetupPage = async () => {
  const profile = await initialProfile();
  if (profile === null) {
    return (
      <div className=" w-full h-full bg-white  overflow-x-hidden ">
        <div className="relative bg-[#404eed] text-white min-w-0 w-full  h-[600px] z-0">
          <div className="flex flex-col items-center  z-50 h-full">
            <div className=" max-w-[1180px] w-full pt-[20px] sm:pt-[50px]  md:pt-[90px] px-5 sm:px-[40px] h-fit flex flex-col justify-center lg:items-center z-20">
              <h1 className=" text-[23px] sm:text-[35px] md:text-[56px] capitalize font-extrabold ">
                Want to chat?
              </h1>
              <p className=" mt-2 sm:mt-3 max-w-[660px] max-sm:font-light max-sm:text-sm w-auto break-words leading-7 ">
                This is the ultimate realtime chat app
              </p>
              <div className=" max-lg:flex-col h-fit lg:h-[80px] flex flex-row items-start lg:items-center mt-3 text-base gap-4 " >
             
              <button className="max-w-[300px] w-auto h-[52px] rounded-full bg-black text-center hover:bg-slate-900 hover:shadow-2xl px-1 " >
                <a href="/sign-in" className=" max-sm:text-xs pr-[4px] sm:pr-[8px] text-white">Open RealtimeChat in browser</a>
              </button>
              </div>
            </div>
          </div>
          <img className="max-lg:hidden absolute bottom-0 left-[-290px] z-10" src="/left.svg" alt="img left" />
          <img className=" max-[436px]:right-[-20px]  absolute bottom-0 right-[-220px] z-10" src="/right.svg" alt="img right" />
          <img className="absolute bottom-0 z-0" src="/homeBg.svg" alt="home" />
        </div>
        <div className=" pt-3 cursor-pointer text-slate-400 text-sm font-semibold w-full  text-center" >
          <a href="#" > Made by Kartik Mandhan</a>
          
        </div>
        
      </div>
    );
  }

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return (
    <>
      <div>Server</div>
      <InitialModal />
    </>
  );
};

export default SetupPage;
