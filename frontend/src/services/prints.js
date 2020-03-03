
import apiClient from "./graphql-api";
import { gql } from "apollo-boost";

export class PrintsService {

    static getPrints(page = 1, itemsPerPage = 10) {

        return apiClient.query({
            query: gql`
              {
                getPrints(page: ${page}, itemsPerPage: ${itemsPerPage}) {
                  totalPrints
                  pages
                  Prints {
                    accessionyear
                    totalpageviews,
                    objectnumber,
                    colorcount,
                    lastupdate,
                    rank,
                    imagecount,
                    description,
                    culture,
                    primaryimageurl,
                    dated,
                    accessionmethod,
                    url,
                    provenance,
                    images {
                      baseimageurl,
                      iiifbaseuri
                    },
                    department,
                    contact,
                    titlescount,
                    id,
                    title,
                    commentary,
                    dimensions,
                    exhibitioncount,
                    century,
                    peoplecount,
                  }
                }
              }
            `
        });
    }
}