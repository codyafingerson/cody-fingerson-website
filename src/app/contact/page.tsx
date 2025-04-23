export default function ContactPage() {
  return (
    <section className="max-w-2xl mx-auto space-y-6"
    >
      <h2 className="text-4xl font-bold">Contact Me</h2>
      <p>Feel free to reach out for collaborations or just a friendly hello!</p>
      <form className="space-y-4" action="https://getform.io/f/bqokzpmb" method="POST">
        <input
          type="text"
          placeholder="Your Name"
          name="name"
          className="w-full p-3 rounded bg-gray-200 focus:outline-none dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          name="email"
          className="w-full p-3 rounded bg-gray-200 focus:outline-none dark:bg-gray-700 dark:text-white"
          required
        />
        <textarea
          placeholder="Your Message"
          className="w-full h-72 p-3 rounded bg-gray-200 focus:outline-none dark:bg-gray-700 dark:text-white"
          rows={5}
          name='message'
          required
        ></textarea>
        <input type="hidden" name="_gotcha" className="hidden" autoComplete="off"></input>

        <div className="flex justify-between">
          <button type="submit" className="w-1/2 py-3 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white transition cursor-pointer mr-2 rounded">
            Send Message
          </button>
          <button type="reset" className="w-1/2 py-3 bg-gray-400 dark:bg-gray-500 hover:bg-gray-500 dark:hover:bg-gray-600 text-white transition cursor-pointer rounded">
            Clear
          </button>
        </div>

      </form>
    </section>
  )
}