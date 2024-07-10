import LoginForm from '@/components/ui/login-form';
import Image from 'next/image';
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-primary_red p-3 md:h-36">
          <div className="w-full h-full text-white justify-center gap-2 flex items-center">
            {/* <AcmeLogo /> */}
            <Image
            src="/AutoParcelIcon.png"
            alt="epic"
            width={100}
            height={100}
            className=""
          />
          <div className='text-4xl font-bold'>AutoParcel</div>
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}