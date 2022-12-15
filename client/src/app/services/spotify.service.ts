import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    //Note: toPromise() is a deprecated function that will be removed in the future.
    //It's possible to do the assignment using lastValueFrom, but we recommend using toPromise() for now as we haven't
    //yet talked about Observables. https://indepth.dev/posts/1287/rxjs-heads-up-topromise-is-being-deprecated

    return Promise.resolve(this.http.get(this.expressBaseUrl+endpoint).toPromise());
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    let resources:ResourceData[];
    let encodedResources = encodeURIComponent(resource);
    if(resource === undefined) {return null}
    return this.sendRequestToExpress(`/search/${category}/${encodedResources}`).then((data) => {
      if(category == 'artist')
      {
        let artistArr:ArtistData[];
        return artistArr = data['artists']['items'].map((artistInfo) => {
        return new ArtistData(artistInfo);
        })
      }
      else if(category == 'album')
      {
        let albumArr:AlbumData[];
        return albumArr = data['albums']['items'].map((albumInfo) => {
        return new AlbumData(albumInfo);
        })
      }
      else
      {
        console.log(data);

        let trackArr:TrackData[];
        return trackArr = data['tracks']['items'].map((trackInfo) => {
        return new TrackData(trackInfo);
        })
      }
    })
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    let encodedArtistId = encodeURIComponent(artistId);
    return this.sendRequestToExpress(`/artist/${encodedArtistId}`).then((data) => {
      return new ArtistData(data);
    });
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    let encodedArtistId = encodeURIComponent(artistId);
    return this.sendRequestToExpress(`/artist-related-artists/${encodedArtistId}`).then((data) => {
      let artistArr:ArtistData[];
        return artistArr = data['artists'].map((artistInfo) => {
        return new ArtistData(artistInfo);
    });
    })
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    let encodedArtistId = encodeURIComponent(artistId);
    return this.sendRequestToExpress(`/artist-top-tracks/${encodedArtistId}`).then((data) => {
      console.log(data);
      let trackArr:TrackData[];
        return trackArr = data['tracks'].map((trackInfo) => {
        return new TrackData(trackInfo);
    });
    })
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    let encodedArtistId = encodeURIComponent(artistId);
    return this.sendRequestToExpress(`/artist-albums/${encodedArtistId}`).then((data) => {
      console.log(data);
      let albumArr:AlbumData[];
      return albumArr = data['items'].map((albumInfo) => {
      return new AlbumData(albumInfo);
    });
    })
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    let encodedAlbumId = encodeURIComponent(albumId);
    return this.sendRequestToExpress(`/album/${encodedAlbumId}`).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    let encodedAlbumId = encodeURIComponent(albumId);
    return this.sendRequestToExpress(`/album-tracks/${encodedAlbumId}`).then((data) => {
      let albumArr:TrackData[];
      return albumArr = data['items'].map((albumInfo) => {
      return new TrackData(albumInfo);
    });
    })
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    let encodedTrackId = encodeURIComponent(trackId);
    return this.sendRequestToExpress(`/track/${encodedTrackId}`).then((data) => {
      return new TrackData(data);
    });
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    return this.sendRequestToExpress(`/track-audio-features/${trackId}`).then((data) => {
      let trackFeature:TrackFeature[]=[];
      trackFeature.push(new TrackFeature('danceability',data['danceability']));
      trackFeature.push(new TrackFeature('energy',data['energy']));
      trackFeature.push(new TrackFeature('speechiness',data['speechiness']));
      trackFeature.push(new TrackFeature('acousticness',data['acousticness'])); 
      trackFeature.push(new TrackFeature('instrumentalness',data['instrumentalness']));
      trackFeature.push(new TrackFeature('liveness',data['liveness']));
      trackFeature.push(new TrackFeature('valence',data['valence']));
      return trackFeature;
    });
  }
}
