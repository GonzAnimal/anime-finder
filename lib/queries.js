import { gql } from "@apollo/client";

export const GET_POPULAR_ANIME_LIST = gql`
  query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        hasNextPage
        lastPage
      }
      media(
        id: $id
        search: $search
        type: ANIME
        sort: FAVOURITES_DESC
        isAdult: false
      ) {
        id
        title {
          romaji
          english
          native
        }
        description
        type
        format
        genres
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        episodes
        bannerImage
        coverImage {
          extraLarge
          large
          medium
          color
        }
        averageScore
        popularity
        meanScore
      }
    }
  }
`;

export const GET_ANIME_DATA = gql`
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      description
      characters {
        edges {
          node {
            id
            name {
              first
              last
            }
            image {
              large
              medium
            }
          }
          role
        }
      }
      type
      format
      genres
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      episodes
      bannerImage
      coverImage {
        extraLarge
        large
        medium
        color
      }
      averageScore
      popularity
      meanScore
    }
  }
`;

export const CHARACTER_FRAGMENT = gql`
  fragment CharacterDetails on Character {
    id
    name {
      first
      middle
      last
      full
    }
    image {
      large
      medium
    }
  }
`;

export const GET_ANIME_STAFF_DATA = gql`
  query ($id: Int, $page: Int, $perPage: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
      }
      characters(
        perPage: $perPage
        page: $page
        sort: [ROLE, FAVOURITES_DESC, ID]
      ) {
        edges {
          node {
            ...CharacterDetails
          }
          role
        }
      }
    }
  }
  ${CHARACTER_FRAGMENT}
`;

export const GET_CHARACTER_DATA = gql`
  query GetCharacterData($id: Int) {
    Character(id: $id) {
      id
      name {
        first
        middle
        last
        full
        native
        alternative
        alternativeSpoiler
        userPreferred
      }
      image {
        large
        medium
      }
      description(asHtml: true)
      gender
      dateOfBirth {
        year
        month
        day
      }
      age
      bloodType
    }
  }
`;

export const SEARCH_CHARACTER_QUERY = gql`
  query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        hasNextPage
        lastPage
      }
      characters(id: $id, search: $search, sort: FAVOURITES_DESC) {
        id
        name {
          first
          middle
          last
          full
        }
        image {
          large
          medium
        }
        media(page: 1, perPage: 10, type: ANIME, sort: FAVOURITES_DESC) {
          edges {
            id
            node {
              title {
                romaji
              }
            }
          }
        }
      }
    }
  }
`;
