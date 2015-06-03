all: development

clean:
	@test -d build && rm -r build || true

deps:
	@npm install

development: clean deps
	./node_modules/.bin/webpack-dev-server --host 0.0.0.0 --config webpack-dev.config.js --inline --hot --content-base .


# cordova: clean index.html
# 	./node_modules/.bin/webpack --config webpack-cordova.config.js
# 	node inject-static-resources.js index.html build -c bundle.css -j cordova.js
# 	cp -R data build

production: clean deps
	./node_modules/.bin/webpack --config webpack-prod.config.js
	./node_modules/.bin/webpack --config webpack-docs.config.js
	babel src --out-dir lib

docs: clean deps
	./node_modules/.bin/webpack --config webpack-docs.config.js
	# node prerender.js
	# rm build/webpack-prerender.js
	# rm build/stats.json
	# node inject-static-resources.js index.html build -s -c bundle.css \
	# 	-t '<meta name="apple-mobile-web-app-status-bar-style" content="black">' \
	# 	-t '<meta name="apple-mobile-web-app-capable" content="yes">' \
	# 	-t '<link rel="apple-touch-icon" href="favicon-60-precomposed.png">' \
	# 	-t '<link rel="apple-touch-icon" sizes="76x76" href="favicon-76-precomposed.png">' \
	# 	-t '<link rel="apple-touch-icon" sizes="120x120" href="favicon-120-precomposed.png">' \
	# 	-t '<link rel="apple-touch-icon" sizes="152x152" href="favicon-152-precomposed.png">' \
	# 	-t '<link rel="shortcut icon" href="favicon.ico" />'
	# cp -R data build
	# for i in 60 76 120 152; do \
	# 	convert favicon.png -adaptive-resize $$i build/favicon-$$i-precomposed.png; \
	# done
	# cp favicon.ico build/favicon.ico

# deploy_prod: prod
# 	scp -r build/. pasokon@i.byimplication.com:/home/pasokon/www/yaourt/

# github: production
# 	git checkout gh-pages
# 	git pull

# 	# delete all old files
# 	@for f in woff woff2 ttf eot ico jpg png svg html css js txt; do rm *.$$f; done || true

# 	mv build/* .
# 	rmdir build
# 	git add .
# 	git commit -m "updated"
# 	git push origin gh-pages
# 	git checkout production
