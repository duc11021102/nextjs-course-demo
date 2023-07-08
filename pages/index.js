import { MongoClient } from "mongodb";
import Head from 'next/head';
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return <Fragment>
    <Head>
      <title>MeetUps</title>
      <meta name="description" content="Browse a huge list of Meetups"></meta>
    </Head>
    <MeetupList meetups={props.meetups}></MeetupList>;
  </Fragment>
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://duc26092001:minhduc001@cluster0.nnmkqb1.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  console.log(meetups);
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
