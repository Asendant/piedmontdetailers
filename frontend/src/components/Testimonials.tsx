const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Greensboro, NC',
    rating: 5,
    text: 'Piedmont Detailers made my car look brand new! They came to my office and did an amazing job. Highly recommend!',
    service: 'Full Wash Package',
  },
  {
    name: 'Mike T.',
    location: 'Winston-Salem, NC',
    rating: 5,
    text: 'Professional service and great results. The team was on time, thorough, and my car has never looked better.',
    service: 'Exterior Package',
  },
  {
    name: 'Jennifer L.',
    location: 'High Point, NC',
    rating: 5,
    text: 'So convenient having them come to my house. The interior cleaning was excellent - they got every detail. Will definitely book again!',
    service: 'Interior Package',
  },
]

const Testimonials = () => {
  return (
    <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 sm:mb-8 max-w-3xl">
          <h2 className="text-4xl sm:text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-slate-800 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed font-normal">
            Real reviews from satisfied customers across the Piedmont Triad.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary-200"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed mb-4 text-base italic">
                "{testimonial.text}"
              </p>
              <div className="pt-4 border-t border-slate-200">
                <p className="font-bold text-slate-800 text-sm">{testimonial.name}</p>
                <p className="text-slate-500 text-xs">{testimonial.location}</p>
                <p className="text-slate-400 text-xs mt-1">{testimonial.service}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
