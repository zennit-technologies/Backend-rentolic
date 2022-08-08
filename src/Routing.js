import React from 'react'
import "./Routing.css";
import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Common/SidebarMaster/Sidebar';
import TopNavbar from './components/Common/TopNavbar';
import BackToTop from './components/Common/BackToBack/BackToTop';
import Dashboard from './components/Dashboard/Dashboard';
import AdminList from './components/AdminPanel/AdminList';
import AddAdminList from './components/AdminPanel/AddAdminList';
import CategoryList from './components/CategoryPanel/CategoryList';
import AddCategoryList from './components/CategoryPanel/AddCategoryList';
import SubCategoryList from './components/SubCategoryPanel/SubCategoryList';
import AddSubCategory from './components/SubCategoryPanel/AddSubCategory';
import BookingList from './components/BookingPanel/BookingList'; 
import ProductsList from './components/ProductsPanel/ProductsList';
import AddProducts from './components/ProductsPanel/AddProducts';
import UsersList from './components/UsersPanel/UsersList';
import AddUsers from './components/UsersPanel/AddUsers';
import LendersList from './components/LendersPanel/LendersList';
import AddLenders from './components/LendersPanel/AddLenders';
import ListBlogs from './components/BlogsPanel/ListBlogs';
import AddBlogs from './components/BlogsPanel/AddBlogs';
import ListTestimonials from './components/Testimonials/ListTestimonials';
import AddTestimonials from './components/Testimonials/AddTestimonials';
import CityList from './components/CityPanel/CityList';
import AddCityList from './components/CityPanel/AddCityList';
import Reposts from './components/ReportAndCharts/Reposts';
import FooterMaster from './components/Common/Footer';
import AdsPanel from './components/AdsPanel/AdsPanel';
import CreateAds from './components/AdsPanel/CreateAds';
import EditAdmin from './components/AdminPanel/EditAdmin';
import EditCategoryList from './components/CategoryPanel/EditCategoryList';
import EditSubCategory from './components/SubCategoryPanel/EditSubCategory';
import EditCity from './components/CityPanel/EditCity';
import EditUser from './components/UsersPanel/EditUser';
import EditLenders from './components/LendersPanel/EditLenders';
import UserPaymentPanel from './components/ReportAndCharts/UserPaymentPanel/UserPaymentPanel';
import LenderPaymentPanel from './components/ReportAndCharts/LenderPaymentPanel/LenderPaymentPanel';
import ReferralReport from './components/ReportAndCharts/ReferralReport/ReferralReport';
import EditProduct from './components/ProductsPanel/EditProduct';
import PendingCategoryList from './components/CategoryPanel/PendingCategoryList';
import PendingSubCategory from './components/SubCategoryPanel/PendingSubCategory';
import PendingProduct from './components/ProductsPanel/PendingProduct';
import ContactUsPanel from './components/SettingPanel/ContactUsPanel';
import ListContactPanel from './components/SettingPanel/ListContactPanel';
import EditBlogs from './components/BlogsPanel/EditBlogs';
import PrivacyPanel from './components/SettingPanel/Privacy/PrivacyPanel';
import TermsPanel from './components/SettingPanel/Terms/TermsPanel';
import AddTermPanel from './components/SettingPanel/Terms/AddTermPanel';
import AddPrivacyPanel from './components/SettingPanel/Privacy/AddPrivacyPanel';
import AddSlider from './components/SettingPanel/Slider/AddSlider';
import SliderScreen from './components/SettingPanel/Slider/SliderScreen';
import ProductViewReportPanel from './components/ProductViewReport/ProductViewReportPanel';
import EditPendingProduct from './components/ProductsPanel/EditPendingProduct';
import AddAboutPanel from './components/SettingPanel/About/AddAboutPanel';
import AboutPanel from './components/SettingPanel/About/AboutPanel';
import ContactUsForm from './components/SettingPanel/ContactusForm/ContactUsForm';
import EditTestimonials from './components/Testimonials/EditTestimonials';
import AdminProfile from './components/AdminProfile/AdminProfile';
import EditContactUsForm from './components/SettingPanel/ContactusForm/EditContactUsForm';
import EditAdsPanel from './components/AdsPanel/EditAdsPanel';
import ApprovedProducts from './components/ProductsPanel/PendingProductList/ApprovedProducts';
import DeclineProduct from './components/ProductsPanel/PendingProductList/DeclineProduct';
import PendingCityList from './components/CityPanel/PendingCityList';
import ReviewProductScreen from './components/ReviewProduct/ReviewProductScreen';
import SubCategoryAdsList from './components/SubCategoryAds/SubCategoryAdsList';
import SubCategoryAdsAdd from './components/SubCategoryAds/SubCategoryAdsAdd';
import SubCategoryAdsEdit from './components/SubCategoryAds/SubCategoryAdsEdit';
import ProductsEditStatus from './components/ProductsPanel/ProductsEditStatus';


const Routing = () => {
  return (
    <>
      <TopNavbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <BackToTop />
        {/* MAIN CONTENT STARTED */}
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/admin" element={<AdminList />} />
          <Route path="/admin/create" element={<AddAdminList />} />
          <Route path="/admin/edit/:id" element={<EditAdmin />} />

          <Route path="/Category" element={<CategoryList />} />
          <Route path="/Category/create" element={<AddCategoryList />} />
          <Route path="/Category/edit/:id" element={<EditCategoryList />} />
          <Route path="/Category/Pending" element={<PendingCategoryList />} />

          <Route path="/Sub-Category" element={<SubCategoryList />} />
          <Route path="/Sub-Category/create" element={<AddSubCategory />} />
          <Route path="/Sub-Category/edit/:id" element={<EditSubCategory />} />
          <Route path="/Sub-Category/pending" element={<PendingSubCategory />} />

          <Route path="/Booking-List" element={<BookingList />} />

          <Route path="/Products" element={<ProductsList />} />
          <Route path="/Product/Create" element={<AddProducts />} />
          <Route path="/Product/Edit/:id" element={<EditProduct />} />
          <Route path="/Product/Pending" element={<PendingProduct />} />
          <Route path="/product-status/edit/:id" element={<ProductsEditStatus />} />

          <Route path="/Users" element={<UsersList />} />
          <Route path="/User/Create" element={<AddUsers />} />
          <Route path="/Users/Edit/:id" element={<EditUser />} />
 
          <Route path="/Lenders" element={<LendersList />} />
          <Route path="/Lenders/Create" element={<AddLenders />} />
          <Route path="/Lenders/Edit/:id" element={<EditLenders />} />

          <Route path="/Blogs" element={<ListBlogs />} />
          <Route path="/Blog/Create" element={<AddBlogs />} />
          <Route path="//Blogs/Edit/:id" element={<EditBlogs />} />

          <Route path="/Premium-verified" element={<ListTestimonials />} />
          <Route path="/Premium-verified/Create" element={<AddTestimonials />} />
          <Route path="/Premium-verified/Edit/:id" element={<EditTestimonials />} />

          <Route path="/City" element={<CityList />} />
          <Route path="/City/Create" element={<AddCityList />} />
          <Route path="/City/Edit/:id" element={<EditCity />} />
          <Route path="/City/Pending" element={<PendingCityList />} />

          <Route path="/reporting" element={<Reposts />} />
          <Route path="/User-Payment" element={<UserPaymentPanel />} />
          <Route path="/Lender-Payment" element={<LenderPaymentPanel />} />
          <Route path="/Referral-Report" element={<ReferralReport />} />

          <Route path="/ads" element={<AdsPanel />} />
          <Route path="/ads/create" element={<CreateAds />} />
          <Route path="/ads/edit/:id" element={<EditAdsPanel />} />

          <Route path="/sub-category-ads" element={<SubCategoryAdsList />} />
          <Route path="/sub-category-ads/create" element={<SubCategoryAdsAdd />} />
          <Route path="/sub-category-ads/edit/:id" element={<SubCategoryAdsEdit />} />

          <Route path="/Admin/Contact-Us/edit/:id" element={<ContactUsPanel />} />
          <Route path="/Admin/privacy-policy" element={<PrivacyPanel />} />
          <Route path="/Admin/terms-condition" element={<TermsPanel />} />
          <Route path="/Admin/privacy-policy/Create" element={<AddPrivacyPanel />} />
          <Route path="/Admin/terms-condition/Create" element={<AddTermPanel />} />

          <Route path="/slider/create" element={<AddSlider />} />
          <Route path="/slider" element={<SliderScreen />} />

          <Route path="/product-views-report" element={<ProductViewReportPanel />} />

          <Route path="/Pending-Product/edit/:id" element={<EditPendingProduct />} />

          <Route path="/Admin/about-us/create" element={<AddAboutPanel />} />
          <Route path="/Admin/about-us" element={<AboutPanel />} />

          <Route path="/Admin/contact-us-form" element={<ContactUsForm />} />
          <Route path="/Admin/contact-form/edit/:id" element={<EditContactUsForm />} />

          <Route path="/admin-profile" element={<AdminProfile />} />

          <Route path="/approved-products-list" element={<ApprovedProducts />} />
          <Route path="/decline-products-list" element={<DeclineProduct />} />

          <Route path="/review-product" element={<ReviewProductScreen />} />
        </Routes>
      </div>
      <FooterMaster />
    </>
  )
}

export default Routing