import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@components/ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import cn from "@utils/shadcn";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import useCreateReport, { ReportFormData } from "@hooks/mutation/useCreateReport";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";

export default function DiaryCreateButton() {
  const [date, setDate] = useState<Date>(new Date());
  const form = useForm<ReportFormData>();
  const { control, handleSubmit } = form;
  const { mutate: createReport } = useCreateReport();

  return (
    <Sheet>
      <SheetTrigger className="flex flex-row items-center justify-center gap-1">
        <p className="text-detail-1 font-medium text-gray-600 mr-1">나의 </p>
        <p className="text-body-3 font-medium text-lime-600">에너지 소비 다이어리</p>
        <p className="text-detail-1 font-medium text-gray-600">기록하기 🌱</p>
      </SheetTrigger>
      <SheetContent className="w-[600px] sm:w-[640px]">
        <SheetHeader className="my-2">
          <SheetTitle className="flex flex-row items-center gap-3 mb-3">
            <p className="text-heading-12 font-medium">그린빛 다이어리 작성하기</p>
          </SheetTitle>
          <SheetDescription className="flex flex-col gap-3">
            <p className="text-body-4">매일의 기록이 환경을 위한 데이터로!</p>
            <p className="text-body-4">
              AI가 똑똑하게 분석한 결과와 <br />
              <span className="text-lime-800 font-bold">그린 포인트</span>를 제공할 거예요
            </p>
          </SheetDescription>
        </SheetHeader>
        <Separator className="bg-gray-200" />
        <Form {...form}>
          <form
            onSubmit={handleSubmit(data => createReport({ ...data, date }))}
            className="flex flex-col my-12 gap-5"
          >
            <FormLabel className="font-normal">언제인가요?</FormLabel>
            <DatePicker date={date} onChangeDate={setDate} />
            <FormField
              control={control}
              name="shower"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-normal">샤워를 몇 분 하셨나요?</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      maxLength={3}
                      min={0}
                      max={1440}
                      placeholder="00분"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="energy"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-normal">전자기기는 얼마나 사용하셨나요?</FormLabel>
                  <FormControl>
                    <Input min={0} type="number" max={1440} placeholder={"0시간"} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="diary"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-normal">에너지 소비를 기록해주세요</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="찬찬히 하루를 돌아보며 자세히 적어주세요"
                      className=" h-[150px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">기록하기</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

function DatePicker({ date, onChangeDate }: { date: Date; onChangeDate: (date: Date) => void }) {
  const handleChangeDate = useCallback(
    (date: Date | undefined) => {
      if (!date) return;
      if (date > new Date()) return;
      onChangeDate(date);
    },
    [date, onChangeDate],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          {date ? date.toLocaleDateString() : <span>날짜를 선택해주세요</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={handleChangeDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
