import ScreenHeaderBtn from "./common/header/ScreenHeaderBtn";

// home screen
import Welcome from "./home/welcome/Welcome";
import CompletedVideos from "./home/nearby/CompletedVideos";
import RecentVideos from "./home/popular/RecentVideos";

// job details screen
import Company from "./videodetails/company/Company";
import { default as JobTabs } from "./videodetails/tabs/Tabs";
import { default as JobAbout } from "./videodetails/about/About";
import { default as JobFooter } from "./videodetails/footer/Footer";
import Specifics from "./videodetails/specifics/Specifics";

// common
import CompletedVideoCard from "./common/cards/nearby/CompletedVideosCard";

export {
  ScreenHeaderBtn,
  Welcome,
  CompletedVideos,
  RecentVideos,
  Company,
  JobTabs,
  JobAbout,
  JobFooter,
  Specifics,
  CompletedVideoCard,
};
