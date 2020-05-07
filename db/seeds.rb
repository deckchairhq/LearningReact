# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


packages = %w[Ubuntu Debian NGINX PHP OpenSSH Postgres]

100.times do |i|
  Vulnerability.create(
    name: "Vulnerabilities #{i + 1}",
    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec est ac magna molestie blandit. In hac habitasse platea dictumst. Cras a velit eu turpis facilisis lobortis id finibus mauris. Morbi ac est nibh. Integer ut aliquet lacus, id mollis enim. Vestibulum eu lectus vestibulum, tempor lacus et, facilisis nisl. Duis mollis fringilla cursus. Donec consectetur justo quis diam rhoncus, eget fermentum velit condimentum.\nSed accumsan ante eu turpis posuere gravida. Nam tempor tellus lectus, sed aliquam elit eleifend at. Pellentesque vel leo cursus, commodo dui sed, egestas nibh. Mauris gravida mollis sapien at congue. Donec cursus elementum dui id lacinia. Aenean lobortis accumsan sagittis. Cras volutpat venenatis congue. Morbi eu odio molestie, faucibus mi sed, consectetur mauris. Mauris efficitur tristique dolor, at blandit nibh maximus eget. Vivamus laoreet non sapien non elementum. Morbi id massa velit. Quisque at turpis sed nulla vehicula congue. Nulla facilisi.",
    packages: [packages[rand(packages.length - 1)], packages[rand(packages.length - 1)]].join(", "),
    score: rand(100) + 1,
    timestamp: Time.new.to_i - (i * rand(10))
  )
end