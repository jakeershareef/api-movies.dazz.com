export class FilterHelper {
    movies(query) {
        let filter: any = {}
        let genre = query.genre
        let title = query.title

        // Check if there's a search string in the query
        if (query.search_string) {
            const searchString = query.search_string.trim(); // Trim whitespace if exists
            if (searchString.length > 0) { // Check if search string is not empty
                const regex = new RegExp(
                    searchString.replace(/\s/, "|"),
                    "ig"
                );
                // Use $or operator to search in title or genre
                filter.$or = [
                    { title: regex },
                    { genre: regex },
                ];
            }
        }

        if (genre) {
            filter.genre = genre
        }
        if (title) {
            filter.title = title
        }

        return filter
    }
}