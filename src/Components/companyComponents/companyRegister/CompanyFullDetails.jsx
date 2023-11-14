import {Field, useFormik} from 'formik'
import { companyFullDetailsSchema } from '../../../Utils/yupValidations/yupCompanyvalidations';
function CompanyFullDetails() {



  const initialValue = {
    
    companyName: "",
    companyLocation: "",
    companyAddress:"",
    size: "",
    gstNumber: "",
    companyRoles: "",
    image:null,
  

  }

  const {handleBlur,handleChange,handleSubmit,errors,touched,values} = useFormik({
     initialValues:initialValue,
     validationSchema:companyFullDetailsSchema,
     onSubmit: async (values) =>{
       console.log(values);
  }
  })


    return (
      <div>
        <section className="max-w-4xl p-6 mx-auto bg-blue-700 rounded-md shadow-md dark:bg-gray-800 mt-20">
          <h1 className="text-xl font-bold text-white capitalize dark:text-white">
            Account settings
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="username"
                >
                  Company name
                </label>
                <input
                  name="companyName"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.companyName}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                {errors.companyName && touched.companyName &&   <div className="font-semibold  text-red-500">
                        {errors.companyName}
                      </div> }
              </div>
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="emailAddress"
                >
                  comapany Location
                </label>
                <input
                  name="companyLocation"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.companyLocation}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                 {errors.companyLocation && touched.companyLocation &&   <div className="font-semibold  text-red-500">
                        {errors.companyLocation}
                      </div> }
              </div>
  
              {/* <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="passwordConfirmation"
                >
                  Password Confirmation
                </label>
                <input
                  id="passwordConfirmation"
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div> */}
              {/* <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="passwordConfirmation"
                >
                  Color
                </label>
                <input
                  id="color"
                  type="color"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div> */}
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="passwordConfirmation"
                >
                  Address
                </label>
                <input
                  name="companyAddress"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.companyAddress}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                 {errors.companyAddress && touched.companyAddress &&   <div className="font-semibold  text-red-500">
                        {errors.companyAddress}
                      </div> }
              </div>
                          <div>
              <label
                  className="text-white dark:text-gray-200"
                  htmlFor="emailAddress"
                >
                   company Size
                </label>
                <input
                  name="size"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.size}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                 {errors.size && touched.size &&   <div className="font-semibold  text-red-500">
                        {errors.size}
                      </div> }
              </div>
              <div>
              <label
                  className="text-white dark:text-gray-200"
                  htmlFor="emailAddress"
                >
                   company Gst number
                </label>
                <input
                  name="gstNumber"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.gstNumber}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                 {errors.gstNumber && touched.gstNumber &&   <div className="font-semibold  text-red-500">
                        {errors.gstNumber}
                      </div> }
              </div>
              {/* <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="passwordConfirmation"
                >
                 Started date
                </label>
                <input
                  id="date"
                  type="date"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div> */}
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="passwordConfirmation"
                >
                 Company roles
                </label>
                <textarea
                  name="companyRoles"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.companyRoles}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                ></textarea>
                 {errors.companyRoles && touched.companyRoles &&   <div className="font-semibold  text-red-500">
                        {errors.companyRoles}
                      </div> }
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  Add profile image 
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-white"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span className="">Upload a file</span>
                        <input
                          id="file-upload"
                          name="image"
                          type="file"
                          className="sr-only"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.image}
                          accept='image/*'
                        />
                       
                      </label>
                      <p className="pl-1 text-white">or drag and drop</p>
                    </div>
                    <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  
                </div>
                {errors.image && touched.image &&   <div className="font-semibold  text-red-500">
                        {errors.image}
                      </div> }
              </div>
            </div>
  
            <div className="flex justify-end mt-6">
              <button type='submit' className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
                Save
              </button>
            </div>
          </form>
        </section>
      </div>
    );
  }
  
  export default CompanyFullDetails;
  