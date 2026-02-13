import { Input } from "@/components/shadcn-ul/input";
import { FormBtn } from "@/components/utility/button";
import Image from "next/image";
import {
  Field,
  FieldGroup,
  FieldSet,
  FieldLabel,
} from "@/components/shadcn-ul/field";
// import {
//   Select,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectLabel,
// } from "@/components/shadcn-ul/select";
import { Card, CardContent, CardTitle } from "@/components/shadcn-ul/card";
// import { SelectContent, SelectValue } from "@radix-ui/react-select";
// import { Button } from "@/components/shadcn-ul/button";
export function HeroHostelForm() {
  return (
    <div className="z-2 relative flex__center md:mt-18">
      <Card className="px-5 bg-white text-primaryT w-full max-w-6xl space-y-5">
        <CardTitle>Where are you flying?</CardTitle>
        <CardContent className="max-md:px-3">
          <form>
            <FieldSet>
              <FieldGroup className="flex md:gap-6 gap-7 md:flex-row flex-col">
                <Field className="flex-2 relative">
                  <FieldLabel
                    className="search_label max-w-fit"
                    htmlFor="destination"
                  >
                    Enter Destination
                  </FieldLabel>
                  <Input
                    placeholder="Istanbul, Turkey"
                    name="destination"
                    id="destination"
                    className="border-[#79747E] py-4 rounded-sm"
                  />
                </Field>
                <Field className="flex-1 relative">
                  <FieldLabel className="search_label max-w-fit">
                    Trip
                  </FieldLabel>
                  {/* <Select>
                    <SelectTrigger className="border border-[#79747E] py-3 rounded-sm">
                      <SelectValue placeholder="Select trip" />
                    </SelectTrigger>

                    <SelectContent className="bg-whiteSmoke text-primaryT shadow-2xs max-w-48 z-30 p-4 rounded-lg">
                      <SelectGroup>
                        <SelectLabel>Trip</SelectLabel>
                        <SelectItem value="return">Return</SelectItem>
                        <SelectItem value="noReturn">No Return</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select> */}
                  <select
                    name="Trip"
                    id="Trip"
                    className="py-2 px-2 w-[90%] outline-none border border-[#79747E] rounded-sm   focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                    // placeholder="Select trip"
                  >
                    <option value="return">Return</option>
                    <option value="no-return">No-return</option>
                  </select>
                </Field>
                <Field className="flex-2 relative">
                  <FieldLabel className="search_label max-w-fit">
                    Depart- Return
                  </FieldLabel>
                  <Input
                    placeholder="07 Nov 22 - 13 Nov 22"
                    className="border-[#79747E] py-2 rounded-sm"
                  />
                </Field>
                <Field className="flex-2 relative">
                  <FieldLabel className="search_label max-w-fit">
                    Passenger - Class
                  </FieldLabel>
                  <Input
                    placeholder="1 Passenger, Economyt"
                    className="border-[#79747E] py-2 rounded-sm"
                  />
                </Field>
              </FieldGroup>
              <div className="flex gap-6 justify-end flex-row">
                {/* <div>
                    <Button>

                    </Button>
                </div> */}
                <div className="max-md:w-full">
                  <FormBtn className="flex gap-2 items-center max-md:w-full">
                    <div>
                      <Image
                        src={"/building.svg"}
                        alt="searchIcon"
                        width={16}
                        height={16}
                      />
                    </div>
                    <div>Show Flights</div>
                  </FormBtn>
                </div>
              </div>
            </FieldSet>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
