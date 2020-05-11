# README

Notes on development so far:

* Webpacker is a bugger to reset from scratch, be sure to clear the public/packs folder to force a rebuild.
* Webpacker pipeline fails aren't verbose.
* Learn the Yarn/Webpacker pipeline better - do a trial run of upgrading deps.

## Finished

* Tutorial on Rails / React - CRUD Recipe site - converted to "Vuln" site
https://www.digitalocean.com/community/tutorials/how-to-set-up-a-ruby-on-rails-project-with-a-react-frontend#prerequisites
http://0.0.0.0:3000/vulnerabilities

* Dropping on GH
https://github.com/deckchairhq/LearningReact

* Now adding "VagueLead" - a demo lead finder....

#VagueLead

Find leads by looking for large companies in each sector. Drill into data about the companies.


User Aim: "I want to see a list of companies in the [Tech/Hospitality/Agriculture] sector ordered by their size..."
User Aim: "I want to click on a large "Technology Sector" company and see details about that company/directors..."
User Aim: "I want to then pursue the company as a lead - external to this demo"

Developer Aim: Navigate data, see charts, show proficiency in Rails and React

* Dashboard: http://0.0.0.0:3000
    * Statically rendered in Rails.
    * Has datagrid with pagination and filters
    * Has a few charts in React-Vis based on the server side data
    
* Company Detail Page
    * This is the detail page for the company
    * This page is powered entirely by React, no Rails.
    * The data for this will come direct from Companies House Open API(s)
    * Shows company data
    * Shows director data