import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface OrderFormData {
    customer_name: string;
    phone: string;
    email?: string;
    property_type: string;
    location: string;
    budget?: string;
    message?: string;
}

export interface ConsultationFormData {
    customer_name: string;
    phone: string;
    email?: string;
    consultation_type: string;
    preferred_date?: string;
    preferred_time?: string;
    message?: string;
}

export function usePublicForms() {
    const [submitting, setSubmitting] = useState(false);
    const { toast } = useToast();

    const validateCaptcha = async (token: string) => {
        const { data, error } = await supabase.functions.invoke('validate-turnstile', {
            body: { token }
        });
        
        if (error) throw new Error('فشل التحقق من الكابتشا');
        if (!data?.success) throw new Error('التحقق من الكابتشا غير صالح');
        return true;
    };

    const submitOrder = async (formData: OrderFormData, captchaToken: string) => {
        try {
            setSubmitting(true);
            
            // 1. Validate CAPTCHA server-side
            await validateCaptcha(captchaToken);

            // 2. Generate Idempotency Key
            const idempotencyKey = crypto.randomUUID();

            // 3. Perform Insert
            const { error } = await supabase
                .from('orders')
                .insert([{
                    customer_name: formData.customer_name,
                    phone: formData.phone,
                    email: formData.email,
                    property_type: formData.property_type,
                    location: formData.location,
                    budget: formData.budget,
                    message: formData.message,
                    status: 'new',
                    captcha_token: captchaToken,
                    idempotency_key: idempotencyKey
                }]);

            if (error) throw error;

            toast({
                title: 'تم إرسال الطلب بنجاح',
                description: 'سنتواصل معك في أقرب وقت ممكن',
            });

            return { success: true };
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'فشل إرسال الطلب';

            toast({
                title: 'خطأ في الإرسال',
                description: errorMessage,
                variant: 'destructive',
            });

            return { success: false, error: errorMessage };
        } finally {
            setSubmitting(false);
        }
    };

    const submitConsultation = async (formData: ConsultationFormData, captchaToken: string) => {
        try {
            setSubmitting(true);
            
            // 1. Validate CAPTCHA server-side
            await validateCaptcha(captchaToken);

            // 2. Generate Idempotency Key
            const idempotencyKey = crypto.randomUUID();

            // 3. Perform Insert
            const { error } = await supabase
                .from('consultations')
                .insert([{
                    customer_name: formData.customer_name,
                    phone: formData.phone,
                    email: formData.email,
                    consultation_type: formData.consultation_type,
                    preferred_date: formData.preferred_date,
                    preferred_time: formData.preferred_time,
                    message: formData.message,
                    status: 'pending',
                    captcha_token: captchaToken,
                    idempotency_key: idempotencyKey
                }]);

            if (error) throw error;

            toast({
                title: 'تم إرسال طلب الاستشارة بنجاح',
                description: 'سنتواصل معك لتحديد موعد الاستشارة',
            });

            return { success: true };
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'فشل إرسال طلب الاستشارة';

            toast({
                title: 'خطأ في الإرسال',
                description: errorMessage,
                variant: 'destructive',
            });

            return { success: false, error: errorMessage };
        } finally {
            setSubmitting(false);
        }
    };

    return { submitOrder, submitConsultation, submitting };
}
