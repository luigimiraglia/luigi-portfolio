export default function Footer() {
  return (
    <div className="flex text-sm sm:text-lg -bottom-0 w-screen bg-gradient-to-tr to-blue-600/90 from-violet-800/90  space-x-6  sm:space-x-20 justify-center py-10 font-light text-white">
      <div className="flex flex-col">
        <h3 className="font-bold">Pages</h3>
        <p>Home</p>
        <p>Projects</p>
        <p>About</p>
      </div>
      <div className="flex flex-col">
        <h3 className="font-bold">Contact</h3>
        <p>Phone</p>
        <p>Email</p>
        <p>Whatsapp</p>
      </div>
      <div className="flex flex-col">
        <h3 className="font-bold">Social</h3>
        <p>LinkedIn</p>
        <p>GitHub</p>
        <p>HandShake</p>
      </div>
    </div>
  );
}
