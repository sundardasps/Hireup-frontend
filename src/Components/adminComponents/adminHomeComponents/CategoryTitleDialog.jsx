import React from "react";
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
import { titleValidationSchema } from "../../../Utils/yupValidations/yupAdminValidations";
import { categoryTitleAdd } from "../../../Api/adminApi";
import { toast, Toaster } from "react-hot-toast";

export function CategoryTitleDialog() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const initialValue = { title: "" };
  const { handleChange, handleBlur, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: initialValue,
      validationSchema: titleValidationSchema,
      onSubmit: async (value) => {
        const response = await categoryTitleAdd(value);
        if (response.data.created) {
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
          Add Title
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
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                name="title"
                label="Add category"
                size="lg"
              />

              {errors.title && touched.title && (
                <span className="font-light text-red-500">{errors.title}</span>
              )}
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                type="submit"
                variant="gradient"
                onClick={handleOpen}
                fullWidth
              >
                Add
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
      <Toaster />
    </>
  );
}
