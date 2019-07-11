import Link from 'next/link';

const Lonk = (props:{href:string, children: React.ReactNode}) => {
  return <div><Link href={props.href}><a>{props.children}</a></Link></div>
}

export const Layout = (props: {children: React.ReactNode}) => (
  <div>
    <h1>Layout</h1>
    <Lonk href='/'>Home</Lonk>
    <Lonk href='/count'>Count</Lonk>
    <Lonk href='/count/123'>Count 123</Lonk>
    <Lonk href='/count/abc'>Count abc</Lonk>
    {props.children}
  </div>
);

