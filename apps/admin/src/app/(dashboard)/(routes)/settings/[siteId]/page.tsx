import prisma from '@/lib/prisma'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'react-hot-toast'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

interface Props {
   params: Promise<{ siteId: string }>
}

export default async function SettingsPage(props: Props) {
   const params = await props.params
   const siteId = params.siteId

   if (siteId !== 'default') {
      redirect('/settings/default')
   }

   const settings = await prisma.siteConfig.findUnique({
      where: { id: 'default' },
   })

   async function updateSettings(formData: FormData) {
      'use server'
      const data = {
         businessName: formData.get('businessName') as string,
         businessAddress: formData.get('businessAddress') as string,
         businessPhone: formData.get('businessPhone') as string,
         businessEmail: formData.get('businessEmail') as string,
         defaultWhatsApp: formData.get('defaultWhatsApp') as string,
      }

      await prisma.siteConfig.update({
         where: { id: 'default' },
         data,
      })

      revalidatePath('/settings/default')
      toast.success('Settings updated!')
   }

   return (
      <div className="container mx-auto py-6">
         <Heading title="Site Settings" description="Configure your site" />
         <Separator className="my-6" />
         <form action={updateSettings} className="space-y-6 max-w-xl">
            <div className="space-y-2">
               <Label>Business Name</Label>
               <Input
                  name="businessName"
                  defaultValue={settings?.businessName || ''}
               />
            </div>
            <div className="space-y-2">
               <Label>Address</Label>
               <Input
                  name="businessAddress"
                  defaultValue={settings?.businessAddress || ''}
               />
            </div>
            <div className="space-y-2">
               <Label>Phone</Label>
               <Input
                  name="businessPhone"
                  defaultValue={settings?.businessPhone || ''}
               />
            </div>
            <div className="space-y-2">
               <Label>Email</Label>
               <Input
                  name="businessEmail"
                  type="email"
                  defaultValue={settings?.businessEmail || ''}
               />
            </div>
            <div className="space-y-2">
               <Label>Default WhatsApp Number</Label>
               <Input
                  name="defaultWhatsApp"
                  defaultValue={settings?.defaultWhatsApp || ''}
                  placeholder="1234567890"
               />
            </div>
            <Button type="submit">Save Settings</Button>
         </form>
      </div>
   )
}