import prisma from '@/lib/prisma'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { SettingsForm } from './components/settings-form'
import { redirect } from 'next/navigation'

interface Props {
   params: Promise<{ siteId: string }>
}

export default async function SettingsPage(props: Props) {
   const params = await props.params

   if (params.siteId !== 'default') { redirect('/settings/default') }

   const settings = await prisma.siteConfig.findUnique({
      where: { id: 'default' },
   })

   return (
      <div className="container mx-auto py-6">
         <Heading title="Site Settings" description="Configure your site" />
         <Separator className="my-6" />
         <SettingsForm settings={settings} />
      </div>
   )
}
