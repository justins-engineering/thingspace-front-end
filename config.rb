# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

js_files = './javascripts/*.js'
out_dir = './dist'

activate :external_pipeline,
         name: :bun_build,
         command: "bun build --entrypoints #{js_files} --outdir ./source/javascripts " \
                  "#{build? ? '--minify --sourcemap=external' : '--watch --sourcemap=linked'}",
         latency: 2,
         source: out_dir

activate :external_pipeline,
         name: :tailwindcss_build,
         command: "bunx @tailwindcss/cli -i ./source/stylesheets/*.css -o #{out_dir}/stylesheets/site.css " \
                  "#{build? ? '--minify' : '--watch'}",
         latency: 2,
         source: out_dir

# activate :directory_indexes

# Layouts
# https://middlemanapp.com/basics/layouts/

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
page '/device_table.html', layout: false

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

# helpers do
#   def some_helper
#     'Helping'
#   end
# end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

# configure :build do
#   activate :minify_javascript
# end
