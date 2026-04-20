import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { usePublicForms } from "@/hooks/website/usePublicForms"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TurnstileWidget } from "@/components/common/TurnstileWidget"

const formSchema = z.object({
    customer_name: z.string()
        .min(3, { message: "يجب أن يحتوي الاسم على 3 أحرف على الأقل" })
        .regex(/^[\u0621-\u064A\s]+$/, { message: "يجب أن يحتوي الاسم على أحرف عربية فقط" }),
    phone: z.string()
        .regex(/^(\+967)?7[0-9]{8}$/, { message: "صيغة رقم الهاتف: +967 7XX XXX XXX" }),
    email: z.string().email({
        message: "البريد الإلكتروني غير صالح",
    }).optional().or(z.literal("")),
    property_type: z.string({
        required_error: "الرجاء اختيار نوع العقار",
    }),
    location: z.string().min(2, {
        message: "الرجاء تحديد الموقع",
    }),
    budget: z.string().optional(),
    message: z.string().optional(),
})

export function OrderForm() {
    const { submitOrder, submitting } = usePublicForms()
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customer_name: "",
            phone: "",
            email: "",
            property_type: "",
            location: "",
            budget: "",
            message: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!captchaToken) return;
        
        const result = await submitOrder(values, captchaToken)
        if (result.success) {
            form.reset()
            setCaptchaToken(null)
            // Reset Turnstile widget if possible, or it will auto-expire
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-right font-cairo">
                <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="customer_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>الاسم الكامل</FormLabel>
                                <FormControl>
                                    <Input placeholder="أدخل اسمك" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>رقم الهاتف</FormLabel>
                                <FormControl>
                                    <Input placeholder="أدخل رقم هاتفك" {...field} dir="ltr" className="text-right" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>البريد الإلكتروني (اختياري)</FormLabel>
                            <FormControl>
                                <Input placeholder="example@domain.com" {...field} dir="ltr" className="text-right" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="property_type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>نوع العقار</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="اختر نوع العقار" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="فيلا">فيلا</SelectItem>
                                        <SelectItem value="شقة">شقة</SelectItem>
                                        <SelectItem value="أرض">أرض</SelectItem>
                                        <SelectItem value="مبنى تجاري">مبنى تجاري</SelectItem>
                                        <SelectItem value="أخرى">أخرى</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>الموقع المفضل</FormLabel>
                                <FormControl>
                                    <Input placeholder="مثال: المكلا - فوة" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>الميزانية التقريبية (اختياري)</FormLabel>
                            <FormControl>
                                <Input placeholder="مثال: 50,000,000 ر.ي" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>تفاصيل إضافية</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="اكتب أي تفاصيل إضافية هنا..."
                                    className="resize-none min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <TurnstileWidget 
                    siteKey="0x4AAAAAAC_rux8Q2-rYWoZL" 
                    onVerify={(token) => setCaptchaToken(token)}
                    onExpire={() => setCaptchaToken(null)}
                />

                <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={submitting || !captchaToken}
                >
                    {submitting ? "جاري الإرسال..." : "إرسال الطلب"}
                </Button>
            </form>
        </Form>
    )
}
