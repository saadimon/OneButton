import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import variables from '../../../../util/variables';
import ComponentLoadingIndicator from '../../../small/ComponentLoadingIndicator';
import P from '../../../text/P';
import ScoreItem from './ScoreItem';

function ScoreboardSection({getUsers, title, light}) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then(users => setUsers(users))
      .finally(() => setLoading(false));
  }, []);

  return users.length > 0 || loading ? (
    <View style={{marginVertical: variables.getSize(5)}}>
      <P style={{fontWeight: '700'}} light={light}>
        {title}
      </P>
      {loading ? (
        <ComponentLoadingIndicator darken={false} loading={loading}>
          <View style={{padding: variables.getSize(70)}} />
        </ComponentLoadingIndicator>
      ) : (
        <ScrollView horizontal>
          {users.map((user, index) => (
            <ScoreItem light={light} user={user} key={index} />
          ))}
        </ScrollView>
      )}
    </View>
  ) : null;
}

export default ScoreboardSection;
