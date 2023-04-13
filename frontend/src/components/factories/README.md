# Factories directory

## Overview

In order to effectively process the API response from the content management system (CMS) Strapi, this project makes use of a factory pattern.

In this design pattern, we have Astro components which are responsible for processing the response from the CMS and transforming it into the corresponding Astro or React components.

## Guidelines

- Any Astro or React components that correspond to Strapi Components live inside
  of the `frontend/src/components/strapi` directory.
- Data fetching for the structure of a page should be done at the page level.
- Page schemas in Strapi should make use of Strapi 'Dynamic Zones' which allow
  schemas to specify areas that are made up of a list of arbitrary Strapi
  Components.

## Guidelines for Factories

In the factory pattern, we provide the input data structure (generally the
`data.attributes.blocks` part of the Strapi payload) and map over it to create
the page structure.

> For an example of this in action, see `HomePageFactory.astro`.

A factory component should accept a single prop called `blocks` which should
have a type definition that represents an array of blocks that it is capable
of processing.

In code, these blocks can then be destructured from the props and mapped over.
Inside the map block we can use a switch statement on the `block.__component`
property which is provided by Strapi. This gives us the type of component.

When we pattern match a component type, we return its corresponding frontend
component or JSX block. If returning a frontend component make sure to pass
along the `block` as data, and to use an `as` in Typescript to coerece the
block to the correct type.
