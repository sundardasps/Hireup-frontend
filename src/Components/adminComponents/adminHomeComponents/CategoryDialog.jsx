import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Option,
  Select,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { getCategoryTitle, addCategory } from "../../../Api/adminApi";
import { categoryValidationSchema } from "../../../Utils/yupValidations/yupAdminValidations";

export function CategoryDialog() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [titles, setTitles] = useState([]);
  const initialValue = {
    category: "",
    title: "",
  };

  useEffect(() => {
    const categoryTitle = async () => {
      try {
        const response = await getCategoryTitle();
        if (response.data.dataFetched) {
          setTitles(response.data.titlesData || []);
        }
      } catch (error) {
        console.error(error);
      }
    };
    categoryTitle();
  }, [titles]);

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: initialValue,
      validationSchema: categoryValidationSchema,
      onSubmit: async () => {
        const response = await addCategory(values);
        if (response.data.created) {
          handleOpen();
          window.location.reload();
        } else {
          toast.error(response.data.message);
        }
      },
    });
  return (
    <>
      <Typography>
        <Button color="blue-gray" onClick={handleOpen}>
          Add Category
        </Button>
      </Typography>

      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <form action="" onSubmit={handleSubmit}>
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Add Category
              </Typography>
              <Typography className="-mb-2" variant="h6">
                Category
              </Typography>
              <Input
                label="Add category"
                size="lg"
                onChange={handleChange}
                value={values.category}
                name="category"
                onBlur={handleBlur}
              />
              {errors.category && touched.category && (
                <span className="font-light text-red-500">
                  {errors.category}
                </span>
              )}
              
              <Typography className="-mb-2" variant="h6">
                Title
              </Typography>
              <Select
                size="md"
                label="Select Title"
                name="title"
                onChange={(selectedTitle) =>
                  handleChange({
                    target: { name: "title", value: selectedTitle },
                  })
                }
                value={values.title}
                onBlur={handleBlur}
              >
                {titles.map((titles, index) => (
                  <Option key={index} value={titles._id}>
                    {titles.is_active&&titles.title}
                  </Option>
                ))}
              </Select>
              {errors.title && touched.title && (
                <span className="font-light text-red-500">{errors.title}</span>
              )}
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                Add
              </Button>
            </CardFooter>
          </Card>
        </form>
        <Toaster />
      </Dialog>
    </>
  );
}
